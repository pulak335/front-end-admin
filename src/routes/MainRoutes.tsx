import MainLayout from "layout/MainLayout";
import { lazy } from "react";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";

import Services from "views/web/Services/index";
import ServicesEdit from "views/web/Services/Edit";
import ServicesAdd from "views/web/Services/Add";

import Projects from "views/web/Projects/index"
import ProjectsEdit from "views/web/Projects/Edit"
import ProjectsAdd from "views/web/Projects/Add"

import Products from "views/web/Products/index"
import ProductsEdit from "views/web/Products/Edit"
import ProductsAdd from "views/web/Products/Add"

import Design from "views/web/Design/index"
import DesignEdit from "views/web/Design/Edit"
import DesignAdd from "views/web/Design/Add"

import Awards from "views/web/Awards/index"
import AwardsEdit from "views/web/Design/Edit"
import AwardsAdd from "views/web/Design/Add"

import Marketing from "views/web/Marketing/index"
import MarketingEdit from "views/web/Marketing/Edit"
import MarketingAdd from "views/web/Marketing/Add"

import Feedback from "views/web/Feedback/index"
import FeedbackEdit from "views/web/Marketing/Edit"
import FeedbackAdd from "views/web/Marketing/Add"



import Responder from "../views/Responder/index"
import ResponderAdd from "../views/Responder/Add"
import ResponderEdit from "../views/Responder/Edit"
import Users from "../views/userManage/index"
import AddUserType from "../views/userManage/AddUserType"
import AccessControl from "views/userManage/AccessControl";
import ViewRole from "views/userManage/Role/index"
import AddRole from "views/userManage/Role/Add"
import EditRole from "views/userManage/Role/Edit"
import UpdateUser from "views/userManage/UpdateUser";
import TypeOfControl from "views/userManage/TypeOfControl";
import Notfound from "views/Notfound/Notfound";

// sample page routing
const Homepage = Loadable(lazy(() => import("views/homepage")));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path:"/services",
      element: <Services/>
    },
    {
      path: "/services/edit",
      element: <ServicesEdit />
    },
    {
      path: "/services/add",
      element: <ServicesAdd />
    },
    
    {
      path: "/projects",
      element: <Projects />
    },
    {
      path: "/projects/add",
      element: <ProjectsAdd />
    },
    {
      path: "/projects/edit",
      element: <ProjectsEdit />
    },
    {
      path: "/products",
      element: <Products />
    },
    {
      path: "/products/add",
      element: <ProductsAdd />
    },
    {
      path: "/products/edit",
      element: <ProductsEdit />
    },
    {
      path: "/designs",
      element: <Design />
    },
    {
      path: "/designs/add",
      element: <DesignAdd />
    },
    {
      path: "/designs/edit",
      element: <DesignEdit />
    },
    {
      path: "/awards",
      element: <Awards />
    },
    {
      path: "/awards/add",
      element: <AwardsAdd />
    },
    {
      path: "/awards/edit",
      element: <AwardsEdit />
    },
    {
      path: "/markings",
      element: <Marketing />
    },
    {
      path: "/markings/add",
      element: <MarketingAdd />
    },
    {
      path: "/markings/edit",
      element: <MarketingEdit />
    },
    {
      path: "/feedback",
      element: <Feedback />
    },
    {
      path: "/feedback/add",
      element: <FeedbackAdd />
    },
    {
      path: "/feedback/edit",
      element: <FeedbackEdit />
    },
    
    
    
    
    
    

    {
      path: "/admin/user-manage",
      element:<Users/>
    },
    
    {
      path: "/admin/user-manage/add",
      element:<AddUserType/>
    },
    {
      path: "/admin/user-manage/edit/:id",
      element:<UpdateUser/>
    },
    {
      path: "/admin/user-access-control/:id",
      element: <AccessControl />
    },
    {
      path:"/admin/role-management",
      element: <ViewRole/>
    },
    {
      path:"/admin/role-management/add",
      element: <AddRole/>
    },
    {
      path:"/admin/role-management/edit/:id",
      element: <EditRole/>
    },
    {
      path:"/admin/role-management/view",
      element: <TypeOfControl/>
    },
    {
      path:"/403",
      element:<Notfound/>
    }
  ],
};

export default MainRoutes;


