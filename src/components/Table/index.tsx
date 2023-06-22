import { FC } from "react";

interface Props {
	tableHeader: React.ReactNode;
	columns: Array<{
		title: string;
		renderContent: (row: any) => React.ReactNode;
	}>;
	rows: Array<any>;
}

const Table: FC<Props> = ({ tableHeader, columns, rows }) => {
	return (
		<table className="table">
			{tableHeader}
			<thead className="table-thead">
				<tr>
					{columns.map((column, index) => (
						<th key={index}>{column.title}</th>
					))}
				</tr>
			</thead>
			<tbody className="table-tbody">
				{rows.map((row) => (
					<tr className="table-tbody-tr" key={row.id}>
						{columns.map((column, index) => (
							<td className="table-tbody-tr-td" key={index}>
								{column.renderContent(row)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
