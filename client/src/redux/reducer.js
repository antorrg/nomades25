import {
    LANDING,
    LANDING_BY_ID,
    PRODUCT,
    PRODUCT_BY_ID,
    CLEAN_STATE,
    ITEM,
    ALL_USERS,
    USER_BY_ID,
    IMAGES,
    WORKS,
    WORK_BY_ID,
    MEDIA,
    MEDIA_AD,
    MEDIA_BY_ID

} from './actions'

const initialState = {
    LandingPublic:[],
    LandingByIdPublic: [],
    ProductsPublic:[],
    ProductIdPublic:[],
    ItemPublic:[],
    MediaPublic: [],
//Protected States:
    Landing:[],
    LandingById: [],
    Products:[],
    ProductId:[],
    Item:[],
    Media: [],
    Users:[],
    UserById: [],
    Images : [],
    Works : [],
    WorkById: [],
    MediaAd:[],
    MediaById:[],

}

const reducer = (state = initialState, {type, payload})=>{
    switch(type){
        case LANDING:
            return {
                ...state,
                Landing: payload,
            }
        case LANDING_BY_ID:
            return {
                ...state,
                LandingById: payload,
            }
        case PRODUCT:
            return {
                ...state,
                Products: payload,
            }
        case PRODUCT_BY_ID:
            return {
                ...state,
                ProductId:payload,
            }
        case ITEM:
            return {
                ...state,
                Item:payload
            }
        case ALL_USERS: 
            return {
                ...state,
                Users: payload,
            }
        case USER_BY_ID:
            return {
                ...state,
                UserById: payload,
            }
        case CLEAN_STATE:
            return {
                ...state,
                Item: [],
                ProductId:[],
                UserById: [],
                WorkById : [],
                LandingById : [],
                MediaAd: [],
                MediaById:[]
            }
        case IMAGES:
            return {
                ...state,
                Images: payload,
            }
        case WORKS : 
            return {
                ...state,
                Works : payload,
            }
        case WORK_BY_ID:
            return {
                ...state,
                WorkById : payload,
            }
        case MEDIA:
            return {
                ...state,
                Media: payload,
            }
        case MEDIA_AD:
            return {
                ...state,
                MediaAd: payload,
            }
            case MEDIA_BY_ID:
                return {
                    ...state,
                    MediaById: payload,
                }
        default:
            return {
                ...state,
            }
    }
}

export default reducer