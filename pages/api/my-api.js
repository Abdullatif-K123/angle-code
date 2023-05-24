// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from "cors";
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
});
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Your API logic goes here
}
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
