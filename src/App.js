import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  deposit: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
        balance: 500,
      };

    case "updateDeposit":
      return {
        ...state,
        deposit: +action.payload,
      };

    case "depositMoney":
      return {
        ...state,
        balance: state.balance + state.deposit,
      };

    case "withdrawMoney":
      return {
        ...state,
        balance: state.balance - 50,
      };

    case "requestLoan":
      if (state.loan === 0) {
        console.log("loan accepted");
        return { ...state, loan: 5000, balance: state.balance + 5000 };
      } else {
        console.log("loan rejected");
        return { ...state };
      }

    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };

    case "closeAccount":
      if (state.balance === 0 && state.loan === 0)
        return {
          ...state,
          isActive: false,
        };
      else return { ...state };

    default:
      console.log("Unknown action type");
  }
}

export default function App() {
  const [{ balance, loan, isActive, deposit }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <input
          type="number"
          disabled={!isActive}
          value={deposit}
          onChange={(e) =>
            dispatch({ type: "updateDeposit", payload: e.target.value })
          }
        ></input>
        <button
          onClick={() => {
            dispatch({ type: "depositMoney" });
          }}
          disabled={!isActive}
        >
          Deposit
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdrawMoney" });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan" });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
