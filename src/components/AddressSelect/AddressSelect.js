import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input, InputLabel, MenuItem, FormControl } from "../../styles/styles";

export default class AddressSelect extends Component {
  state = {
    addressName: this.props.addressName || "",
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
      .then(latLng => this.props.onSelect({ addressName, ...latLng }))
      .catch(error => console.error("Error", error));
  };

  render() {
    const { searchOptions } = this.state;

    return (
      <div style={this.props.style}>
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
            <React.Fragment>
              {this.props.children}
              <FormControl
                style={{
                  width: "100%",
                  position: "relative"
                }}
              >
                <InputLabel htmlFor="address">Address</InputLabel>
                <Input
                  {...getInputProps({
                    placeholder: "Search Address ...",
                    id: "address"
                  })}
                />
                <div
                  className="autocomplete-dropdown-container"
                  style={{ 
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    transform: "translateY(100%)",
                    backgroundColor: "white",
                    zIndex: "9999",
                    left: 0,
                    border: "1px solid lightgray",
                    borderTop: "none"
                  }}
                >
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "lightgray", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <MenuItem
                        {...getSuggestionItemProps(suggestion, {
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </MenuItem>
                    );
                  })}
                </div>
              </FormControl>
            </React.Fragment>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
