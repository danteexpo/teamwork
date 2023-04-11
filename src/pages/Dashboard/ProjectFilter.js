import React from "react";

const filterList = [
	"All",
	"Mine",
	"Development",
	"Design",
	"Marketing",
	"Sales",
];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
	return (
		<div className="project-filter">
			<nav>
				{filterList.map(filter => (
					<button
						key={filter}
						onClick={() => changeFilter(filter)}
						className={currentFilter === filter ? "active" : ""}
					>
						{filter}
					</button>
				))}
			</nav>
		</div>
	);
};

export default ProjectFilter;
