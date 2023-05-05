const OrderEntity = require('./entities/order/OrderEntity');
const OrderItemEntity = require('./entities/order/OrderItemEntity');
const BranchEntity = require('./entities/organization/BranchEntity');
const CustomerEntity = require('./entities/organization/CustomerEntity');
const CustomerAddressEntity = require('./entities/organization/CustomerAddressEntity');
const MerchantEntity = require('./entities/organization/MerchantEntity');
const CategoryEntity = require('./entities/product/CategoryEntity');
const ProductEntity = require('./entities/product/ProductEntity');
const CityEntity = require('./entities/CityEntity');
const CountryEntity = require('./entities/CountryEntity');
const CitySubdivisionEntity = require('./entities/CitySubdivisionEntity');
const MerchantTaxEntity = require('./entities/product/MerchantTaxEntity');
const SectionEntity = require('./entities/organization/SectionEntity');
const TableEntity = require('./entities/organization/TableEntity');
const TerminalBranchEntity = require('./entities/organization/TerminalBranchEntity');
const InitEntity = require('./entities/InitEntity');
module.exports = {
    OrderEntity,
    OrderItemEntity,
    BranchEntity,
    CustomerEntity,
    CustomerAddressEntity,
    MerchantEntity,
    MerchantTaxEntity,
    ProductEntity,
    CityEntity,
    CountryEntity,
    CitySubdivisionEntity,
    CategoryEntity,
    SectionEntity,
    TableEntity,
    TerminalBranchEntity,
    InitEntity
};
