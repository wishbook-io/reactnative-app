import Realm from 'realm';
import constant from '../utils/const';
import Countries from './models/Countries';
import AuthenticationModel from './models/AuthenticationModel';
import UserInfo from './models/UserInfo';
import CompanyUser from './models/CompanyUser';
import UserProfile from './models/UserProfile';
import CompanyGroupFlag from './models/CompanyGroupFlag';
import ResponsePromotion from './models/ResponsePromotion';
import ImageBanner from './models/ImageBanner';
//home
import Response_BuyerGroupType from './models/home/Response_BuyerGroupType';
import Brand from './models/home/Brand';
import Catalogs_details from './models/home/Catalogs_details';
import Image from './models/home/Image';
import Products from './models/home/Products';
import StoriesModel from './models/home/StoriesModel';
import Thumbnail from './models/home/Thumbnail';
//add-catalog
import Add_Catalog_Response from './models/catalog/addcatalog/Add_Catalog_Response';
import RequestEav from './models/catalog/addcatalog/RequestEav';
//catalog
import CatalogObj from './models/catalog/CatalogObj';
import Eavdata from './models/catalog/Eavdata';
import MultipleSuppliers from './models/catalog/MultipleSuppliers';
import ProductObj from './models/catalog/ProductObj';
import Response_Brands from './models/catalog/Response_Brands';
import Response_State from './models/catalog/Response_State';
import Response_Catalog from './models/catalog/Response_Catalog';
import Response_CatalogMini from './models/catalog/Response_CatalogMini';
import ResponseSellerPolicy from './models/catalog/ResponseSellerPolicy';
import Supplier_company_rating from './models/catalog/Supplier_company_rating';
import Supplier_details from './models/catalog/Supplier_details';
import ThumbnailObj from './models/catalog/ThumbnailObj';
import SubFilterObj from './models/catalog/Response_SubFilter';
import CategoryTree from './models/category/CategoryTree';
import ChildCategory from './models/category/ChildCategory';
import ChildCategory_ from './models/category/ChildCategory_';
import ResponseLanguages from './models/language/ResponseLanguages';

console.log(Realm.defaultPath);
export default new Realm({
    schema: [Countries, AuthenticationModel,
        UserInfo, CompanyUser, UserProfile, CompanyGroupFlag,
        ResponsePromotion, ImageBanner,ResponseLanguages,
        Response_BuyerGroupType, Brand,Response_State, Catalogs_details, Image, Products, StoriesModel, Thumbnail, ThumbnailObj,
        Add_Catalog_Response, RequestEav, CatalogObj, Eavdata, Response_Brands, Response_Catalog, ProductObj, MultipleSuppliers,
        Response_CatalogMini, ResponseSellerPolicy, Supplier_company_rating,SubFilterObj, Supplier_details,
        CategoryTree, ChildCategory, ChildCategory_],
    	schema_version: constant.dbSchema
});
