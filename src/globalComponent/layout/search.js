/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { Fragment } from 'react';
import '../../css/tooltip.css'

class SearchBox extends React.Component {
	state = {
		placeholder: this.props.placeholder,
	};




	render() {
		return (
			<Fragment>
				<div className='tooltip border w-full flex border-secondary'>
					<input
						style={{ width: '100%', padding: '7px 20px' }}
						type='text'
						value={this.props.searchText}
						onChange={(e) => this.props.setSearchText(e.target.value)}
						placeholder={this.state.placeholder}
					/>
					{/* <span class="tooltiptext">{this.state.placeholder}</span> */}
				</div>
			</Fragment>
		);
	}
}

export default SearchBox;
