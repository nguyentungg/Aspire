const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/admin",
        component: () => import("pages/admin/Index.vue"),
        meta: { requiresAuth: "admin" },
        children: [
          { path: "", redirect: "customers" },
          {
            path: "customers",
            component: () => import("pages/admin/CustomerList.vue")
          },
          {
            path: "loans",
            component: () => import("pages/admin/LoansManagement.vue")
          }
        ]
      },
      { path: "/signin", component: () => import("pages/Signin.vue") },
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: { requiresAuth: "client" },
        children: [
          { path: "", redirect: "loans" },
          { path: "loans", component: () => import("pages/MyLoans.vue") }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
