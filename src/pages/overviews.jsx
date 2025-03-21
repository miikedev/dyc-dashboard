import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Mail } from "lucide-react"
import { getOverviews } from "@/apis/overviews"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { formatDate } from "@/lib/formatDate"

export default function Overviews() {
  const [overviews, setOverviews] = useState({
    totalCandidates: 0,
    newCandidateCount: 0,
    totalBlogs: 0,
    newBlogsCount: 0,
    totalSubscribers: 0,
    newSubscribersCount: 0,
    recentBlogs: [],
    recentSubscribers: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverviews = async () => {
      try {
        const data = await getOverviews();
        setOverviews(data);
      } catch (error) {
        toast("Failed to fetch overviews.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverviews();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  }

  return (
    <div className="space-y-6 mt-[1rem]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your DYC Admin Dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviews.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">+{overviews.newCandidateCount} added this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviews.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">+{overviews.newBlogsCount} published this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviews.totalSubscribers}</div>
            <p className="text-xs text-muted-foreground">+{overviews.newSubscribersCount} new this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Latest blog posts published on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overviews.recentBlogs.map((blog) => (
                <div key={blog._id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-sm text-muted-foreground">Published on {formatDate(blog.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Subscribers</CardTitle>
            <CardDescription>Latest subscribers to your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overviews.recentSubscribers.map((subscriber) => (
                <div key={subscriber._id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <Mail className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{subscriber.email}</p>
                    <p className="text-sm text-muted-foreground">Subscribed on {formatDate(subscriber.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
