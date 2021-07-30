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
					<span class="tooltiptext">{this.state.placeholder}</span>
				</div>
			</Fragment>
		);
	}
}

export default SearchBox;
