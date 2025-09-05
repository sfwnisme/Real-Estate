type Props = {
  title: string;
  description?: string;
};
export default function Title({ title, description }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-medium">{title}</h1>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}
