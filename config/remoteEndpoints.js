
const BASE_URL = 'https://sandbox-api.devtokeninc.com/store/api/v2';

module.exports = {
    BRANCH: {
        GET_ALL: `${BASE_URL}/organization/v1/branch`,
        GET_BY_ID: `${BASE_URL}/organization/v1/branch/`
    },
    TERMINAL: {
        GET: `${BASE_URL}/organization/v1/terminal?branchId=`,
        GET_BY_ID: `${BASE_URL}/organization/v1/terminal/`
    },
    PRODUCT: {
        GET_ALL: `${BASE_URL}/product/v1/merchant/product`,
        GET_BY_ID: `${BASE_URL}/product/v1/merchant/product/`
    },
    CATEGORY: {
        GET_ALL: `${BASE_URL}/product/v1/merchant/category`,
        GET_BY_ID: `${BASE_URL}/product/v1/merchant/category/`
    },
    MERCHANT_TAX: {
        GET_ALL: `${BASE_URL}/product/v1/merchant/tax`,
        GET_BY_ID: `${BASE_URL}/product/v1/merchant/tax/`
    },
    ORDER: {
        GET_ALL: `${BASE_URL}/order/v1/summary?filter[branchId]=`,
        GET_BY_ID: `${BASE_URL}/order/v1/order/`,
    },
    MERCHANT: {
        GET_MERCHANT: `${BASE_URL}/organization/v1/merchant`
    },
    SECTION: {
        GET_ALL: `${BASE_URL}/organization/v1/section?branchId=`,
        GET_BY_ID: `${BASE_URL}/organization/v1/section/`
    },
    TABLE: {
        GET_ALL: `${BASE_URL}/organization/v1/table?sectionId=`,
        GET_BY_ID: `${BASE_URL}/organization/v1/table/`
    },
    AUTH: {
        GET_ACCESS_TOKEN: `https://sandbox-api.devtokeninc.com/identity/v1/token`,
    },
    WEBHOOK: {
        CREATE: `${BASE_URL}/clientSettings/v1`,
        GET_ALL: `${BASE_URL}/clientSettings/v1`,
        DELETE: `${BASE_URL}/clientSettings/v1/`
    }
};

