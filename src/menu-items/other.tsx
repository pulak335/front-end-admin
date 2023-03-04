// third-party
// assets
import {
  IconHome,
  IconUser,
  IconLockAccess,
  IconUserCheck,
  IconFingerprint,
  IconBuildingStore,
  IconBox,
  IconAffiliate,
  IconSettings,
  IconNotification,
  IconBrandDiscord,
  IconBrandReddit,
  IconCurrencyBitcoin,
  IconMail,
  IconArchive,
  IconTruck,
  IconReceiptTax,
  IconTicket,
  IconBucket,
  IconNotebook,
  IconId,
  IconEraser,
  IconLayoutList,
  IconBrandCodesandbox,
  IconUsers,
  IconDevices,
  IconBrandDocker,
  IconReportMoney,
  IconCash,
  IconPlane,
  IconUserPlus,
  IconReport,
  IconFileText,
  IconGitMerge,
  IconBrandFirefox
} from "@tabler/icons"; 
import { FormattedMessage } from "react-intl";

// constant
const icons = {
  IconCash,
  IconReportMoney,
  IconHome,
  IconGitMerge,
  IconUser,
  IconUsers,
  IconLockAccess,
  IconPlane,
  IconUserPlus,
  IconFingerprint,
  IconSettings,
  IconBrandDocker,
  IconReport,
  IconTruck,
  IconReceiptTax,
  IconFileText,
  IconDevices,
  IconBrandFirefox
};
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    {
      id: "Dashboard",
      title: <FormattedMessage id="Dashboard" />,
      type: "item",
      icon: icons.IconHome,
      url: "/",
      breadcrumbs: true,
    },
    {
      id: "Web Site",
      title: <FormattedMessage id="Web Site" />,
      type: "collapse",
      icon: icons.IconBrandFirefox,
      children:[
        {
          id: "Services",
          title: <FormattedMessage id="Services" />,
          type: "item",
          url: "/services",
          breadcrumbs: true,
        },
        {
          id: "Products",
          title: <FormattedMessage id="Products" />,
          type: "item",
          url: "/products",
          breadcrumbs: true,
        },
        {
          id: "Projects",
          title: <FormattedMessage id="Projects" />,
          type: "item",
          url: "/projects",
          breadcrumbs: true,
        },
        {
          id: "Designs",
          title: <FormattedMessage id="Designs" />,
          type: "item",
          url: "/designs",
          breadcrumbs: true,
        },
        {
          id: "Awards",
          title: <FormattedMessage id="Awards" />,
          type: "item",
          url: "/awards",
          breadcrumbs: true,
        },
        {
          id: "Marketings",
          title: <FormattedMessage id="Marketings" />,
          type: "item",
          url: "/markings",
          breadcrumbs: true,
        },
        {
          id: "Works Us",
          title: <FormattedMessage id="Works Us" />,
          type: "item",
          url: "/works-us",
          breadcrumbs: true,
        },
        {
          id: "Achivements",
          title: <FormattedMessage id="Achivements" />,
          type: "item",
          url: "/achivements",
          breadcrumbs: true,
        },
        {
          id: "Partners",
          title: <FormattedMessage id="Partners" />,
          type: "item",
          url: "/partners",
          breadcrumbs: true,
        },
        {
          id: "Feedback",
          title: <FormattedMessage id="Feedback" />,
          type: "item",
          url: "/feedback",
          breadcrumbs: true,
        },
        {
          id: "Footer",
          title: <FormattedMessage id="Footer" />,
          type: "item",
          url: "/footer",
          breadcrumbs: true,
        },
      ]
    },
    {
      id: "Employees",
      title: <FormattedMessage id="Employees" />,
      type: "collapse",
      icon: icons.IconUser,
     
      children:[
        {
          id: "All Employees",
          title: <FormattedMessage id="All Employees" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Holidays",
          title: <FormattedMessage id="Holidays" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Leaves",
          title: <FormattedMessage id="Leaves" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Attendance",
          title: <FormattedMessage id="Attendance" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Department",
          title: <FormattedMessage id="Department" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Designations",
          title: <FormattedMessage id="Designations" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Scheduling",
          title: <FormattedMessage id="Scheduling" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Overtime",
          title: <FormattedMessage id="Overtime" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Resignation",
          title: <FormattedMessage id="Resignation" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },

      ]
    },
    {
      id: "Clients",
      title: <FormattedMessage id="Clients" />,
      type: "item",
      icon: icons.IconUsers,
      url: "/hospital",
      breadcrumbs: true,
    },
    {
      id: "Assets",
      title: <FormattedMessage id="Assets" />,
      type: "item",
      icon: icons.IconDevices,
      url: "/hospital",
      breadcrumbs: true,
    },

    {
      
      id: "Projects",
      title: <FormattedMessage id="Projects" />,
      type: "collapse",
      icon: icons.IconBrandDocker,
     
      children:[
        {
          id: "All Projects",
          title: <FormattedMessage id="All Projects" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Products",
          title: <FormattedMessage id="Products" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
      ]
    },
    {
      
      id: "Sales",
      title: <FormattedMessage id="Sales" />,
      type: "collapse",
      icon: icons.IconReportMoney,
     
      children:[
        {
          id: "Estimates",
          title: <FormattedMessage id="Estimates" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Invoices",
          title: <FormattedMessage id="Invoices" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Payments",
          title: <FormattedMessage id="Payments" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Expenses",
          title: <FormattedMessage id="Expenses" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Provident Fund",
          title: <FormattedMessage id="Provident Fund" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Taxes",
          title: <FormattedMessage id="Taxes" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
      ]
    },

    {
      id: "Payroll",
      title: <FormattedMessage id="Payroll" />,
      type: "collapse",
      icon: icons.IconCash,
     
      children:[
        {
          id: "Employee Salary",
          title: <FormattedMessage id="Employee Salary" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Payroll Items",
          title: <FormattedMessage id="Payroll Items" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
      ]
    },
    {
      
      id: "Jobs",
      title: <FormattedMessage id="Jobs" />,
      type: "collapse",
      icon: icons.IconPlane,
     
      children:[
        {
          id: "Manage Resumes",
          title: <FormattedMessage id="Manage Resumes" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Shortlist Candidates",
          title: <FormattedMessage id="Shortlist Candidates" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
        ,
        {
          id: "Candidates List",
          title: <FormattedMessage id="Candidates List" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
        ,
        {
          id: "Aptitude Result",
          title: <FormattedMessage id="Aptitude Result" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
        ,
        {
          id: "Interview Questions",
          title: <FormattedMessage id="Interview Questions" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
      ]
    },
    {
      id: "Settings",
      title: <FormattedMessage id="Settings" />,
      type: "item",
      icon:icons.IconSettings,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Policies",
      title: <FormattedMessage id="Policies" />,
      type: "item",
      icon:icons.IconFileText,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },

    {
      
      id: "Reports",
      title: <FormattedMessage id="Reports" />,
      type: "collapse",
      icon: icons.IconReport,
     
      children:[
        {
          id: "Expense Report",
          title: <FormattedMessage id="Expense Report" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "Payments Report",
          title: <FormattedMessage id="Payments Report" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
        ,
        {
          id: "Project Reports",
          title: <FormattedMessage id="Project Reports" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
        ,
        {
          id: "Employee Report",
          title: <FormattedMessage id="Employee Report" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
        ,
        {
          id: "Attendance Reports",
          title: <FormattedMessage id="Attendance Reports" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
        ,
        {
          id: "Leave Report",
          title: <FormattedMessage id="Leave Report" />,
          type: "item",
          url: "/reports/incidents-report",
          breadcrumbs: true,
        }
      ]
    },
        
    {
      id: "Users",
      title: <FormattedMessage id="Users" />,
      type: "item",
      icon:icons.IconUserPlus,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Roles",
      title: <FormattedMessage id="Roles" />,
      type: "item",
      icon:icons.IconGitMerge,
      url: "/admin/role-management",
      breadcrumbs: true,
    },
  ],
}

;

export default other;
