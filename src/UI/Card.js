import React from 'react';
import classes from './Card.module.css';
import 'bootstrap/dist/css/bootstrap.css';
const Card = ({ children }) => {
	return (
		<div className={`${classes.out}`}>			
				<div className={`${classes.card}`}>
					<div className={`${classes.content}`}>{children}</div>
				</div>			
		</div>
		)
};

export default Card;
