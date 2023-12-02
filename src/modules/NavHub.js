import "../styles/NavHub.css";

import { FaNoteSticky } from "react-icons/fa6";

// function NavElement(props) {
// 	return (
// 		<div className="nav-element">
// 			<div className="nav-icon-wrapper">{props.activeIcon}</div>
// 			<span className="nav-title">{props.title}</span>
// 		</div>
// 	);
// }

// function NavHub() {
// 	return (
// 		<div id="nav-wrapper">
// 			<div id="nav-hub">
// 				<NavElement activeIcon={<FaNoteSticky />} inactiveIcon={<FaNoteSticky />} title="Notes" />
// 				<NavElement activeIcon={<FaNoteSticky />} inactiveIcon={<FaNoteSticky />} title="Notes" />
//                 <NavElement activeIcon={<FaNoteSticky />} inactiveIcon={<FaNoteSticky />} title="Notes" />
// 			</div>
// 		</div>
// 	);
// }

// export default NavHub;

import { useState } from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";

import EditNoteIcon from "@mui/icons-material/EditNote";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";

import BarChartIcon from "@mui/icons-material/BarChart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

import PaymentsIcon from "@mui/icons-material/Payments";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function TabsBottomNavExample() {
	const [index, setIndex] = useState(0);
	const colors = ["primary", "danger", "success", "warning"];

	return (
		<div id="nav-wrapper">
			<Tabs
				size="lg"
				aria-label="Bottom Navigation"
				value={index}
				onChange={(event, value) => setIndex(value)}
				sx={(theme) => ({
					p: 1,
					borderRadius: 16,
					maxWidth: "100%",
					mx: "auto",
					boxShadow: theme.shadow.sm,
					[`& .${tabClasses.root}`]: {
						py: 1,
						flex: 1,
						transition: "0.3s",
						fontWeight: "md",
						fontSize: "md",
						[`&:not(.${tabClasses.selected}):not(:hover)`]: {
							opacity: 0.7,
						},
					},
				})}
			>
				<TabList
					variant="plain"
					size="sm"
					disableUnderline
					sx={{ borderRadius: "lg", p: 0 }}
					color="primary"
				>
					<Tab
						disableIndicator
						value="/graph"
						to="/graph"
						component={Link}
						orientation="vertical"
						color="primary"
					>
						<ListItemDecorator>
							{index == "/graph" ? <AssessmentIcon /> : <AssessmentOutlinedIcon />}
						</ListItemDecorator>
						Graphs
					</Tab>
					<Tab
						disableIndicator
						value="/"
						to="/"
						component={Link}
						orientation="vertical"
						color="primary"
					>
						<ListItemDecorator>
							{index == "/" ? <FeaturedPlayListIcon /> : <FeaturedPlayListOutlinedIcon />}
						</ListItemDecorator>
						Notes
					</Tab>
					<Tab
						disableIndicator
						value="/currency"
						to="/currency"
						component={Link}
						orientation="vertical"
						color="primary"
					>
						<ListItemDecorator>
							{index == "/currency" ? <PaymentsIcon /> : <PaymentsOutlinedIcon />}
						</ListItemDecorator>
						Currency
					</Tab>
				</TabList>
			</Tabs>
		</div>
	);
}
