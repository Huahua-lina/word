import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
      <h1 className="text-6xl font-serif font-bold text-muted-foreground/30">404</h1>
      <h2 className="text-2xl font-serif font-bold">未找到页面</h2>
      <p className="text-muted-foreground">您访问的页面似乎已经失传。</p>
      <Link href="/">
        <Button variant="outline">返回首页</Button>
      </Link>
    </div>
  );
}
