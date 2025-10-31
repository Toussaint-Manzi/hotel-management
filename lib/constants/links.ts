export const links = {
  general: [
    {
      label: "Dashboard",
      icon: "home-1",
      path: "/dashboard",
    },
    {
      label: "Employés",
      icon: "users-group",
      path: "/employes",
    },
    {
      label: "Plaintes",
      icon: "document-1",
      children: [
        {
          label: "Types",
          icon: "document-1",
          path: "/types-plaintes",
        },
        {
          label: "Plaintes créées",
          icon: "document-1",
          path: "/plaintes-créées",
        },
      ],
    },
    {
      label: "Postes",
      icon: "case",
      path: "/postes",
    },
    {
      label: "Departments",
      icon: "structure",
      path: "/departments",
    },
    {
      label: "Localisation",
      icon: "location",
      children: [
        {
          label: "Provinces",
          icon: "location",
          path: "/provinces",
        },
        {
          label: "Communes",
          icon: "location",
          path: "/communes",
        },
        {
          label: "Territoires",
          icon: "location",
          path: "/territoires",
        },
        {
          label: "Quartiers",
          icon: "location",
          path: "/quartiers",
        },
      ],
    },
    {
      label: "Langues",
      icon: "language",
      path: "/langues",
    },
  ],
  support: [
    {
      label: "Paramètres",
      icon: "setting",
      path: "/paramètres",
    },
    {
      label: "Aide",
      icon: "question-circle",
      path: "/aide",
    },
  ],
};
