import useSWR from "swr/immutable";

type Page = "create" | "result";

type LaunchPadPageData = {
  page: Page;
};

const useLaunchPadPage = () => {
  const fallbackData: LaunchPadPageData = { page: "create" };

  const { data: _data, mutate } = useSWR<LaunchPadPageData>("launchpadPageData", { fallbackData });

  const data = _data!;

  return {
    page: data!.page,

    setPage: (page: Page) => {
      mutate({ ...data, page });
    },
  };
};

export default useLaunchPadPage;
