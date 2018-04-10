//Core
import React from 'react';

//Instruments
import Styles from '../../styles.less';

const Spinner = ({ isFetching }) => {
	return isFetching ?
		<div className = 'spinner' /> :
		null;
}

export default Spinner;