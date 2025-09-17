const UnitPage = async ({
  params,
  //   searchParams,
}: {
  params: Promise<{ id: string }>;
  //   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;

  return <div>{id}</div>;
};

export default UnitPage;
