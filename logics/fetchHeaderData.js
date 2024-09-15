import { clientMenu } from "../lib/sanityConnect";

const fetchHeaderExam = async () => {
  const rawExamData = await clientMenu.fetch(
    `*[_type=="exam"]{examname , branch->{title}}`
  );
  const examData = rawExamData.map(({ branch, examname }) => {
    return {
      displayName: examname,
      path: `${branch.title}/${examname}`,
    };
  });
  return examData;
};

const fetchHeaderBranch = async () => {
  const rawBranchData = await clientMenu.fetch(`*[_type=="branch"]{title }`);
  const branchData = rawBranchData.map(({ title }) => {
    return {
      displayName: title,
      path: title,
    };
  });
  return branchData;
};

export { fetchHeaderBranch, fetchHeaderExam };
