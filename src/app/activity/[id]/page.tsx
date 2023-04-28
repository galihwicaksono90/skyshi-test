import TodoListCards from "@/components/todoListCards";

interface Props {
  params: {
    id: string;
  };
}

export default function ActivityPage({ params }: Props) {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <TodoListCards id={params.id} />
    </section>
  );
}
