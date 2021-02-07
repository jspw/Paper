import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./Forms.scss";

const apiDomain = "http://localhost:8080/";

const TextFieldForm = (props) => (
  <TextField
  id={props.id}
  label={props.label}
  multiline
  rows={props.rows}
  variant="outlined"
  onChange={props.handleChange(props.id)}
  labelWidth={props.labelWidth}
  value={props.values}
  fullWidth
  className={props.classes.textField}
  required={props.required}
/>
)

const TextForm = (props) => (
  <FormControl
    className={props.classes.textField}
    variant="outlined"
    fullWidth
    required={props.required}
  >
    <InputLabel>{props.label}</InputLabel>
    <OutlinedInput
      id={props.id}
      onChange={props.handleChange(props.id)}
      value={props.values}
      labelWidth={props.labelWidth}
    />
  </FormControl>
);

const PasswordForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl
      className={props.classes.textField}
      variant="outlined"
      fullWidth
      required
    >
      <InputLabel>{props.label}</InputLabel>
      <OutlinedInput
        id={props.id}
        type={showPassword ? "text" : "password"}
        value={props.values}
        onChange={props.handleChange(props.id)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={"password"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={props.labelWidth}
      />
    </FormControl>
  );
};

const Forms = (props) => {
  const type = props.type;

  const [universities, setUniversities] = useState(null);
  const [isApiLoaded, setIsApiLoaded] = useState(true);

  // console.log(props);

  useEffect(() => {
    axios({
      method: "get",
      url: apiDomain + "university/all",
    })
      .then((response) => {
        // console.log("All Universites..");

        // console.log(response.data);

        const data = response.data;

        if (data.status === "OK") {
          setUniversities(data.result.data.universities);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsApiLoaded(false);
      });
  }, []);

  const SelectForm = (props) => {
    // console.log("COMPONENT : select form");
    let items = [];
    const id = props.id;

    if (universities) {
      // console.log("Univbersity", universities);

      // for (let i = 0; i < universities.length; i++) {
      //   console.log("Loop");
      //   console.log(universities[i]);
      // }

      if (id === "role")
        items = [
          {
            id: "Teacher",
            value: "Teacher",
          },
          {
            id: "Student",
            value: "Student",
          },
        ];
      else if (id === "university") {
        items = [];
        universities.forEach((element) => {
          items.push({
            id: element._id,
            value: element.shortform,
          });
        });
      } else if (id === "department") {
        items = [];

        if (props.selectedUniversity) {
          // console.log("Selected University ", props.selectedUniversity);
          universities.forEach((element) => {
            if (element._id === props.selectedUniversity) {
              element.departments.forEach((dept) => {
                // console.log(dept);
                items.push({
                  id: dept._id,
                  value: dept.shortform,
                });
              });
            }
          });
        }
      } else if (id === "session") {
        items = [];
        items = [
          {
            id: "2016-2017",
            value: "2016-2017",
          },
          {
            id: "2017-2018",
            value: "2017-2018",
          },
          {
            id: "2018-2019",
            value: "2018-2019",
          },
          {
            id: "2020-2021",
            value: "2020-2021",
          },
        ];
      } else if (id === "designation") {
        items = [];
        items = [
          {
            id: "Department Head",
            value: "Department Head",
          },
          {
            id: "Professor",
            value: "Professor",
          },
          {
            id: "Assistant Professor",
            value: "Assistant Professor",
          },
          {
            id: "Lecturer",
            value: "Lecturer",
          },
        ];
      } else if(id === "options") {
        items = [];
        items = [
          {
            id: "optA",
            value: "A",
          },
          {
            id: "optB",
            value: "B",
          },
          {
            id: "optC",
            value: "C",
          },
          {
            id: "optD",
            value: "D",
          },
        ];
      }
    }

    const menuItems = items.map((item, i) => {
      // console.log(items);
      return (
        <MenuItem key={i} value={item.id}>
          {item.value}
        </MenuItem>
      );
    });

    return (
      <FormControl
        variant="outlined"
        className={props.classes.textField}
        fullWidth
        required
      >
        <InputLabel>{props.label}</InputLabel>
        <Select
          id={id}
          value={props.values}
          onChange={props.handleChange(id)}
          label={props.label}
        >
          <MenuItem disabled>
            <em>{props.label}</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    );
  };

  if (type === "text") {
    return <TextForm {...props} />;
  } else if (type === "password") {
    return <PasswordForm {...props} />;
  } else if (type === "select") {
    return <SelectForm {...props} />;
  } else {
    return <TextFieldForm {...props}/>
  }
};

export default Forms;
