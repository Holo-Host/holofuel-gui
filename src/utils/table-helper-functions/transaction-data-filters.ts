// TODO: Ref from HC-Admin

// export const filterApps = (installed_apps, downloaded_apps) => {
//   const mergedAppsList = mergeApps(installed_apps,downloaded_apps);
//   return mergedAppsList;
//
//   // const allAppsWithStats = addStats(mergedAppsList,allStats)
//   // return allAppsWithStats;
// }
//
// ////////////////////////////////////////////////////////////////////////
//
// const mergeApps = (installed_apps, downloaded_apps) => {
//   const filtered_downloaded_apps = downloaded_apps.filter((d_apps) => {
//     const duplicate_app = installed_apps.find((i_apps) => {
//       return i_apps.appName === d_apps.appName;
//     })
//     return duplicate_app == undefined
//   })
//   return [...new Set([...installed_apps, ...filtered_downloaded_apps])]
// }
