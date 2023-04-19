
export default async (req, res) => {
const adminUser = ["ak4838960@gmail.com","solity.fun@gmail.com"];

  if (req.method === "POST") {
    const verified = adminUser.find((ele) => ele === req.body.email);
    res.status(200).json(verified)
    return res.end()
  }
  res.status(200).json({ name: "admin" })
  return res.end()
}
