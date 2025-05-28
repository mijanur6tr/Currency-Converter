import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'
import InputBox from './components/InputBox.jsx'


function App() {

  const [amount,setAmount] = useState('')
  const [from,setFrom] = useState('usd')
  const [to,setTo] = useState("bdt")
  const [converted , setConverted] = useState(0)

  const currencyInfo =useCurrencyInfo(from)

  const convert = ()=>{
    setConverted(currencyInfo[to]*amount)
  }

  const swap = ()=> {
    setAmount(converted)
    setConverted(amount)
    setFrom(to)
    setTo(from)
  }

  const options = Object.keys(currencyInfo)


    return (
       <div
  className="min-h-screen w-full bg-[#2b8e869a] flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
  // style={{
  //   backgroundImage: `url('https://images.unsplash.com/photo-1518614969073-c9d2a57b337d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
  // }}
>
  <div className="w-full max-w-2xl px-4">
    <div className="mx-auto border border-gray-600 rounded-lg p-6 backdrop-blur-sm bg-[#3369159a] shadow-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          convert();
        }}
      >
        <h1 className="text-center text-3xl sm:text-4xl text-white mb-5">
          Currency Converter
        </h1>

        <div className="w-full mb-4">
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(amount) => setAmount(amount)}
          />
        </div>

        <div className="relative w-full h-8 my-2">
          <button
            type="button"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1 border-2 border-white rounded-md bg-blue-600 text-white px-4 py-1 text-sm sm:text-base"
            onClick={swap}
          >
            Swap
          </button>
        </div>

        <div className="w-full mb-4">
          <InputBox
            label="To"
            amount={converted}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={(currency) => setTo(currency)}
            amountDisable
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 mb-1 rounded-lg transition-all"
        >
          Convert {from.toUpperCase()} to {to.toUpperCase()}
        </button>

        <p className="text-center mt-2 text-xl sm:text-2xl text-white">
          Your amount in {to.toUpperCase()} is {converted}
        </p>
      </form>
    </div>
  </div>
</div>

    );

  }

  export default App;