export function getSidebarNavText(pathname) {
    const pathParts = pathname.split('/').filter(Boolean);
  const isCourse = pathParts.includes('course');
  const isModule = pathParts.includes('module');
  const isActivity = pathParts.includes('activity');

  return {
    all: isActivity ? 'All Activities' : isModule ? 'All Modules' : isCourse ? 'All Courses' : 'All Activities',
    recent: isActivity ? 'Recent Activity' : isModule ? 'Recent Module' : isCourse ? 'Recent Course' : 'Recent Activity',
    my: isActivity ? 'My Activity' : isModule ? 'My Module' : isCourse ? 'My Course' : 'My Activity'
  }
}
  