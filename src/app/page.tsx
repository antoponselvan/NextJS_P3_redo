import { Button, Divider } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";

export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-cols-4 gap-1 m-2">
      <div className=" col-span-3 text-center">
        <h1>Top Posts</h1>
      </div>
      <div className=" col-span-1 text-center m-2">
        <TopicCreateForm />
        <Divider />
        <h3>Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
