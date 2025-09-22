const UnitPage = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;

  return <div>{name}</div>;
};

export default UnitPage;
