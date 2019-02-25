// import * as React from 'react';
// import { Link } from 'react-router';

// export function ResumeContainer2() {
//   return (
//     <article>
//         <p>
//           Resume screen
//         </p>
//         <br />
//         <div className="c-alert c-alert--info">
//         </div>
//       <br />
//     </article>
//   );
// };

test("basic", async () => {
  expect(1).toBe(1);
});

test("basic failure", async () => {
  try {
    expect(1).toBe(2);
  } catch (error) {
    expect(1).toBe(1);
  }
});
