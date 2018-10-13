import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class AddressSelect extends Component {
  state = {
    addressName: "",
    searchOptions: {
      type: "address",
      componentRestrictions: {
        country: "il"
      }
    }
  };

  handleChange = addressName => {
    this.setState({ addressName });
  };

  handleSelect = addressName => {
    this.setState({ addressName });
    geocodeByAddress(addressName)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onSelect({addressName, ...latLng}))
      .catch(error => console.error("Error", error));
  };

  render() {
    const { searchOptions } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          value={this.state.addressName}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          debounce={1000}
          searchOptions={searchOptions}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
