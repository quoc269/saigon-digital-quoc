import React from 'react';
import classes from './Card.module.css';
import 'bootstrap/dist/css/bootstrap.css';
const Card = ({ children }) => {
	return (
		<div className={`${classes.out} py-5 px-5 `}>			
				<div className={`${classes.card}`}>
					<div className={`${classes.content} p-5`}>{children}</div>
				</div>			
		</div>
		)
};

export default Card;
