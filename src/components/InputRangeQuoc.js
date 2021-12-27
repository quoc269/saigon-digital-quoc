import React, { useState } from 'react';
import classes from './Mortgage.module.css';
import Card from '../UI/Card';
import 'bootstrap/dist/css/bootstrap.css';
import styled from "styled-components";
import "./styles.css";

// excess height to improve interactive area / accessibility
const height = "36px";
const thumbHeight = 36;
const trackHeight = "16px";

// colours
const upperColor = "#ffffff";
const lowerColor = "#81559b";
const thumbColor = "#611a94";
const thumbHoverColor = "#611a94";
const upperBackground = `linear-gradient(to bottom, ${upperColor}, ${upperColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;
const lowerBackground = `linear-gradient(to bottom, ${lowerColor}, ${lowerColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;

// Webkit cannot style progress so we fake it with a long shadow on the thumb element
const makeLongShadow = (color, size) => {
  let i = 18;
  let shadow = `${i}px 0 0 ${size} ${color}`;

  for (; i < 706; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }

  return shadow;
};


const Wrapper = styled.div`
  /* width:100%; */
`;

const QuocRange = styled.input`
  overflow: hidden;
  display: block;
  appearance: none;  
  width: 100%;
  margin-right: 150px;
  height: ${height};
  cursor: pointer;
  background-color: #f7f7f7; 
  border-radius: 20px;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${height};
    background: ${lowerBackground};
	color: #cccccc;
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${thumbHeight}px;
    width: ${thumbHeight}px;
    background: ${thumbColor};
    border-radius: 50%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${makeLongShadow(upperColor, "-10px")};
    transition: background-color 150ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;
    height: ${height};
    background: ${upperBackground};	
  }

  &::-moz-range-progress {
    background: ${lowerBackground};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${thumbColor};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
  }

  &::-ms-track {
    width: 100%;
    height: ${height};
    border: 0;
    /* color needed to hide track marks */
    color: transparent;
    background: transparent;
  }

  &::-ms-fill-lower {
    background: ${lowerBackground};
  }

  &::-ms-fill-upper {
    background: ${upperBackground};
  }

  &::-ms-thumb {
    appearance: none;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${thumbColor};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    /* IE Edge thinks it can support -webkit prefixes */
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    &::-webkit-slider-thumb {
      background-color: ${thumbHoverColor};
    }
    &::-moz-range-thumb {
      background-color: ${thumbHoverColor};
    }
    &::-ms-thumb {
      background-color: ${thumbHoverColor};
    }
  }
`;

const Mortgage = () => {
	const [purchaseprice, setPurchaseprice] = useState(1000000);
	const [downpayment, setDownpayment] = useState(1000000);
	const [repaymenttime, setRepaymenttime] = useState(30);
	const [interestRate, setInterestRate] = useState(100);
	const [paymentInfo, setpaymentInfo] = useState(false);

	let principalLoanAmt = purchaseprice - downpayment;
	// Formula for mortgage payments: M = P[r(1+r)^n/((1+r)^n)-1)]	
	let monthlyMortgagePayment = interestRate / 100 / 12;
	let repaid = repaymenttime * 12;
	let factor = Math.pow(monthlyMortgagePayment + 1, repaid);
	let numerator = monthlyMortgagePayment * factor;
	let denominator = factor - 1;
	let quotient = numerator / denominator;
	let payment = principalLoanAmt * quotient;
	let monthlyPayments =
		!isNaN(payment) &&
		payment !== Number.POSITIVE_INFINITY &&
		payment !== Number.NEGATIVE_INFINITY
			? Math.floor(payment)
			: 0;

	let totalPayments = monthlyPayments * repaid;
	let totalInterestPayments = monthlyPayments * repaid - principalLoanAmt;
	let dollarUSLocale = Intl.NumberFormat('en-US');
	function submitHandler(e) {
		e.preventDefault();
		setpaymentInfo(true);
	}
	return (
		<Card>
			<form onSubmit={submitHandler}>
				<div className={classes.mortgage}>
					<h1>Mortgage calculator</h1>									
					<div className='row'>
						<div className="col-sm-4">
							<div>
								<label htmlFor="range">Purchase price: <b> ${dollarUSLocale.format(purchaseprice)}</b></label>
							</div>
							<div>
							<QuocRange
								type="range"
								value={purchaseprice}
								id="range"
								min="0"
								max="1000000"
								step="1"								
								onChange={(e) => setPurchaseprice(e.target.value)}
							/>
							</div>						
						</div>
						<div className="col-sm-4">
							<div>
								<label htmlFor="range">Down payment: <b>${dollarUSLocale.format(downpayment)}</b></label>
							</div>
							<div>
								<QuocRange
								type="range"
								value={downpayment}
								id="range"
								min="0"
								max="1000000"
								step="1"
								onChange={(e) => setDownpayment(e.target.value)}
								/>
							</div>
						</div>
						<div className="col-sm-4">
							<div>
								<label htmlFor="range">
								Repayment time: <b>{dollarUSLocale.format(repaymenttime)}</b>
								{repaymenttime <= 1 ? ' year' : ' years'}
								</label>
							</div>
							<div>
								<QuocRange
								type="range"
								value={repaymenttime}
								id="range"
								min="0"
								max="30"
								onChange={(e) => setRepaymenttime(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div  className='row'>				
						<div className="col-sm-4">
							<div>
								<label htmlFor="range">Interest rate: <b>{dollarUSLocale.format(interestRate)}</b> %</label>
							</div>
							<div>
								<QuocRange
								type="range"
								value={interestRate}
								id="range"
								min="0"
								max="100"
								step="1"
								onChange={(e) => setInterestRate(e.target.value)}
								/>
							</div>
						</div>					
											
						<div className="col-sm-4">						
							<div>
								<p>Loan amount</p>
							</div>
							<div>
								<h2>${dollarUSLocale.format(principalLoanAmt)}</h2>
							</div>
						</div>
						<div className="col-sm-4">
							
								{/* Check that the result is a finite number. If so, display the
							results. or don't display anything */}
						
								<div>
									<p>Estimated per month:</p>
								</div>
									
								<div>
									<h2>${dollarUSLocale.format(monthlyPayments)}</h2>
								</div>						
						</div>	
									
					</div>
				</div>
				<div className={classes.action}>
					<button>Get a mortgage quote</button>
					{paymentInfo && (
						<>
							<h1>Payment Information</h1>
							<p>
								your monthly payment will be <b>${dollarUSLocale.format(monthlyPayments)}</b>
							</p>
							<p>
								your total payment will be <b>${dollarUSLocale.format(totalPayments)}</b>
							</p>
							<p>
								your totalInterest payment will be{' '}
								<b>${totalInterestPayments}</b>
							</p>
						</>
					)}
				</div>
			</form>
		</Card>
	);
};

export default Mortgage;

// Formula for mortgage payments: M = P[r(1+r)^n/((1+r)^n)-1)]
// M = the total monthly mortgage payment
// P = the principal loan amount(Purchase Price - Down Payment)
// r = your monthly interest rate
// n = number of payments over the loanâs lifetime.
