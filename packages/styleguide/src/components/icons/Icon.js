import React from "react";
import styled from "styled-components";

import "./iconfont/style.css";

const Icon = styled(({ ...props }) => <i className={`icon-${props.name}`} />)``;

export default Icon;
