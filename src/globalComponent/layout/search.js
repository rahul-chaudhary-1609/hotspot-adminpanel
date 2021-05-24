import React, { Fragment } from 'react';

class SearchBox extends React.Component {
	state = {
		placeholder: this.props.placeholder,
	};

	render() {
		return (
			<Fragment>
				<div
					className={
						this.props.id == 'driverPayment'
							? 'border w-1/2 flex border-secondary'
							: 'border w-full flex border-secondary'
					}>
					<input
						style={{ width: '100%', padding: '7px 20px ' }}
						type='text'
						value={this.props.searchText}
						onChange={(e) => this.props.setSearchText(e.target.value)}
						placeholder={this.state.placeholder}
					/>
				</div>
			</Fragment>
		);
	}
}

export default SearchBox;
