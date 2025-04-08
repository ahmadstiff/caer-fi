// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20Metadata} from "openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IAggregatorV3 {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    function getRoundData(uint80 _roundId)
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

    function latestRoundData()
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

contract PriceFeed {
    error QuotePriceZero();
    error BasePriceZero();

    struct PriceLists {
        string name;
        address feed;
    }

    struct PriceManual {
        string name; // PEPE/USD
        uint256 price; // $1
        uint256 decimal; // 18
        uint256 startedAt; // 2194883758913
        uint256 updatedAt; // 2433764785894
    }

    // Collateral -> price oracle, Borrow -> price oracle
    mapping(address => address) public quoteFeed;
    mapping(address => address) public baseFeed;
    mapping(address => PriceManual) public tokenPrices;

    mapping(address => bool) public subOwner;

    PriceLists[] public priceLists;
    address owner;

    event AddPriceFeed(string name, address token, address priceFeed);
    event EditPriceFeed(string name, address peiceFeed, uint256 index);
    event AddPairPriceCollateral(address collateral, address priceFeed);
    event AddPairPriceBorrow(address borrow, address priceFeed);
    event AddPriceManual(string name, address token, uint256 price, uint256 decimal, uint256 updatedAt);

    modifier onlyOwner() {
        require(msg.sender == owner || subOwner[msg.sender], "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        subOwner[msg.sender] = true;
    }

    function addPriceFeed(string memory _name, address _token, address _priceAddress) public {
        priceLists.push(PriceLists(_name, _priceAddress));
        quoteFeed[_token] = _priceAddress;
        baseFeed[_token] = _priceAddress;

        emit AddPriceFeed(_name, _token, _priceAddress);
    }

    function editPriceFeed(string memory _name, address _priceAddress, uint256 _index) public {
        priceLists[_index] = PriceLists(_name, _priceAddress);

        emit EditPriceFeed(_name, _priceAddress, _index);
    }

    function addPairPriceCollateral(address _collateral, address _priceAddress) public {
        quoteFeed[_collateral] = _priceAddress;

        emit AddPairPriceCollateral(_collateral, _priceAddress);
    }

    function addPairPriceBorrow(address _borrow, address _priceAddress) public {
        baseFeed[_borrow] = _priceAddress;

        emit AddPairPriceBorrow(_borrow, _priceAddress);
    }

    function addPriceManual(string memory _name, address _tokenAddres, uint256 _price, uint256 _decimal) public {
        if (tokenPrices[_tokenAddres].startedAt != 0) {
            tokenPrices[_tokenAddres] = PriceManual({
                name: tokenPrices[_tokenAddres].name,
                price: _price,
                decimal: _decimal,
                startedAt: tokenPrices[_tokenAddres].startedAt,
                updatedAt: block.timestamp
            });
        } else {
            tokenPrices[_tokenAddres] = PriceManual(_name, _price, _decimal, block.timestamp, block.timestamp);
        }

        emit AddPriceManual(_name, _tokenAddres, _price, _decimal, block.timestamp);
    }

    function getPrice(address _collateral, address _borrow) public view returns (uint256) {
        uint256 quotePrice;
        uint256 basePrice;
        uint256 decimal;
        if (tokenPrices[_collateral].startedAt != 0) {
            quotePrice = tokenPrices[_collateral].price;
        } else {
            (, int256 quote,,,) = IAggregatorV3(quoteFeed[_collateral]).latestRoundData();
            quotePrice = uint256(quote);
        }
        if (tokenPrices[_borrow].startedAt != 0) {
            basePrice = tokenPrices[_borrow].price;
            decimal = 10 ** tokenPrices[_borrow].decimal;
        } else {
            (, int256 base,,,) = IAggregatorV3(baseFeed[_borrow]).latestRoundData();
            decimal = 10 ** IERC20Metadata(_borrow).decimals(); // 1e18
            basePrice = uint256(base);
        }
        if (quotePrice == 0) revert QuotePriceZero();
        if (basePrice == 0) revert BasePriceZero();
        return (quotePrice * decimal) / basePrice;
    }

    function tokenCalculator(uint256 _amount, address _tokenFrom, address _tokenTo) public view returns (uint256) {
        (uint256 _realPrice,) = getPriceTrade(_tokenTo, _tokenFrom);
        uint256 amountOut = _amount * getQuoteDecimal(_tokenTo) / _realPrice;
        return amountOut;
    }
    //USDC - PEPE

    function getPriceTrade(address _tokenFrom, address _tokenTo) public view returns (uint256, uint256) {
        uint256 quotePrice;
        uint256 basePrice;
        uint256 decimal;

        quotePrice = tokenPrices[_tokenFrom].price; // USDC/USD
        basePrice = tokenPrices[_tokenTo].price; // PEPE/USD
        decimal = 10 ** tokenPrices[_tokenTo].decimal; // PEPE Decimal

        if (quotePrice == 0) revert QuotePriceZero();
        if (basePrice == 0) revert BasePriceZero();

        return (((quotePrice * decimal) / basePrice), decimal);
    }

    function priceCollateral(address _token) public view returns (uint256) {
        uint256 quotePrice;
        if (tokenPrices[_token].startedAt != 0) {
            quotePrice = tokenPrices[_token].price;
        } else {
            (, int256 quote,,,) = IAggregatorV3(quoteFeed[_token]).latestRoundData();
            quotePrice = uint256(quote);
        }
        return quotePrice;
    }

    function priceBorrow(address _token) public view returns (uint256) {
        uint256 quotePrice;
        if (tokenPrices[_token].startedAt != 0) {
            quotePrice = tokenPrices[_token].price;
        } else {
            (, int256 quote,,,) = IAggregatorV3(quoteFeed[_token]).latestRoundData();
            quotePrice = uint256(quote);
        }
        return quotePrice;
    }

    function getQuoteDecimal(address _token) public view returns (uint256) {
        uint256 decimal;
        if (tokenPrices[_token].startedAt != 0) {
            decimal = 10 ** tokenPrices[_token].decimal;
        } else {
            decimal = 10 ** IERC20Metadata(_token).decimals(); // 1e18
        }
        return uint256(decimal);
    }

    function getBaseDecimal(address _token) public view returns (uint256) {
        uint256 decimal;
        if (tokenPrices[_token].startedAt != 0) {
            decimal = 10 ** tokenPrices[_token].decimal;
        } else {
            decimal = 10 ** IERC20Metadata(_token).decimals(); // 1e6
        }
        return uint256(decimal);
    }

    function getQuoteDescription(address _token) public view returns (string memory) {
        string memory name;
        if (tokenPrices[_token].startedAt != 0) {
            name = tokenPrices[_token].name;
        } else {
            name = IAggregatorV3(quoteFeed[_token]).description(); // WETH/USD
        }
        return name;
    }

    function getBaseDescription(address _token) public view returns (string memory) {
        string memory name;
        if (tokenPrices[_token].startedAt != 0) {
            name = tokenPrices[_token].name;
        } else {
            name = IAggregatorV3(baseFeed[_token]).description(); // PEPE/USD
        }
        return name;
    }

    function addOwner(address _user) public {
        subOwner[_user] = true;
    }
}
