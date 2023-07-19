'use client';

import { useState } from 'react';

export default function Home() {
  const [field, setField] = useState<{
    amount: number;
    interestRate: number;
    tenure: number;
    totalAmount: number;
  }>({
    amount: 10000,
    interestRate: 7,
    tenure: 1,
    totalAmount: 0,
  });

  const calculateTotalAmount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let totalAmount = 0;

    if (field.tenure === 1) {
      const interestAmount =
        field.amount * (field.interestRate * 0.01) * field.tenure;
      totalAmount = field.amount + interestAmount;
    } else {
      for (let i = 1; i <= field.tenure; i++) {
        if (i === 1) {
          const interestAmount = field.amount * (field.interestRate * 0.01);
          totalAmount = field.amount + interestAmount;
        } else {
          const interestAmount = totalAmount * (field.interestRate * 0.01);
          totalAmount += interestAmount;
        }
      }
    }

    setField({ ...field, totalAmount: totalAmount });
  };

  return (
    <div>
      <h1>
        <b>Compound Interest Calculator</b>
      </h1>
      <form>
        <p>
          <label>Amount: </label>
          <input
            type="text"
            name="amount"
            value={field.amount}
            onChange={(e) => setField({ ...field, amount: +e.target.value })}
          />
        </p>

        <p>
          <label>Interest Rate: </label>
          <input
            type="text"
            name="interestRate"
            value={field.interestRate}
            onChange={(e) =>
              setField({ ...field, interestRate: +e.target.value })
            }
          />
        </p>

        <p>
          <label>Tenure: </label>
          <input
            type="text"
            name="tenure"
            value={field.tenure}
            onChange={(e) => setField({ ...field, tenure: +e.target.value })}
          />
        </p>

        <p>
          <button name="calculate" onClick={calculateTotalAmount}>
            Calculate
          </button>
        </p>

        {field.totalAmount > 0 ? (
          <p>Total amount: {field.totalAmount.toFixed(0)}</p>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}
