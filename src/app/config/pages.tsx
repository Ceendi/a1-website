import HomeContent from "../components/tabs/HomeContent";
import ProjectsContent from "../components/tabs/ProjectsContent";
import BlogContent from "../components/tabs/BlogContent";
import AboutContent from "../components/tabs/AboutContent";

export interface Page {
  id: string;
  label: string;
  path: string;
  content?: React.ReactNode;
}

export const PAGES: Page[] = [
  { id: "home", label: "HOME", path: "/", content: <HomeContent /> },
  {
    id: "projects",
    label: "PROJECTS",
    path: "/projects",
    content: <ProjectsContent />,
  },
  { id: "blog", label: "BLOG", path: "/blog", content: <BlogContent /> },
  { id: "about", label: "ABOUT", path: "/about", content: <AboutContent /> },
];
