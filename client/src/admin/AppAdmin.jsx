import {Routes, Route} from 'react-router-dom'
import {
  Admin,
  HelpView,
  ProductComp,
  AlbumAdmin,
  AdminItem,
  UserComp,
  AdminNav,
  ProductEdition,
  LandEdition,
  DetailCardUpd,
  UserEdition,
  UserCreate,
  UserUpgrade,
  EditPassword,
  ProductCreate,
  ItemCreate,
  ImagesComponent,
  TabsPage,
  CreateWork,
  OurWorkEdit,
  CreateLanding,
  MediaCreate,
  MediaUpdate} from './AdminIndex'

const AppAdmin = () => {

  return (
    <>
    <Routes>
    <Route path='/' element={<Admin />}>
        <Route  index element={<TabsPage/>} />
        <Route path='product' element={<ProductComp/>}/>
        <Route path='product/:id' element={<ProductComp/>}/>
        <Route path='product/create' element={<ProductCreate/>}/>
        <Route path='product/update/:id' element={<ProductEdition/>}/>
        <Route path='product/item/:id' element={<AdminItem/>}/>
        <Route path='product/item/create/:id' element={<ItemCreate/>}/>
        <Route path='product/item/update/:id' element={ <DetailCardUpd/>}/>
        <Route path='users' element={ <UserComp/>}/>
        <Route path='users/create' element={<UserCreate/>}/>
        <Route path='users/upgrade/:id' element={ <UserUpgrade/>}/>
        <Route path='users/updateinfo/:id' element={ <EditPassword/>}/> 
        <Route path='users/:id' element={ <UserComp/>}/> 
        <Route path='users/update/:id' element={ <UserEdition/>}/> 
        <Route path='users/profile/:id' element={ <UserComp/>}/> 
        <Route path='media/images' element={ <ImagesComponent/>}/>
        <Route path= 'work/create' element={<CreateWork/>}/>
        <Route path= 'work/update/:id' element={<OurWorkEdit/>}/>
        <Route path= 'land/create' element={<CreateLanding/>}/>
        <Route path= 'land/update/:id' element={<LandEdition/>}/>
        <Route path= 'media/create' element={<MediaCreate/>}/>
        <Route path= 'media/update/:id' element={<MediaUpdate/>}/>
        <Route path='help' element={ <HelpView/>}/> 
      </Route>
    </Routes>
    </>
  )
}

export default AppAdmin