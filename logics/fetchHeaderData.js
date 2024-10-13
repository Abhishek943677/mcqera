import { clientMenu, clientPreviousYear, clientQuickLinks } from "../lib/sanityConnect";

const fetchHeaderExam = async () => {
  const rawExamData = await clientMenu.fetch(
    `*[_type=="exam"]{examname , branch->{title}}`
  );
  const examData =await rawExamData.map(({ branch, examname }) => {
    return {
      displayName: examname,
      path: `${branch.title}/${examname}`,
    };
  });
  return examData;
};

const fetchHeaderBranch = async () => {
  const rawBranchData = await clientMenu.fetch(`*[_type=="branch"]{title }`);
  
  const branchData =await rawBranchData.map(({ title }) => {
    return {
      displayName: title,
      path: title,
    };
  });
  return branchData;
};

const fetchPYQdata = async () => {
  // Fetch the raw data from the client
  const rawPYQdata = await clientPreviousYear.fetch(`*[_type=="exams"]{branch,examname}`);

  // Function to remove duplicates and map to displayName/path structure
  const getUniqueExams = (data) => {
    const uniqueExams = new Map();
    data.forEach((item) => {
      const key = `${item.examname}-${item.branch}`;
      if (!uniqueExams.has(key)) {
        uniqueExams.set(key, {
          displayName: item.examname,
          path: `${item.branch}/${item.examname}`
        });
      }
    });
    return Array.from(uniqueExams.values());
  };

  // Get unique exams
  const uniqueExams = getUniqueExams(rawPYQdata);
  return uniqueExams
};



export { fetchHeaderBranch, fetchHeaderExam, fetchPYQdata };
