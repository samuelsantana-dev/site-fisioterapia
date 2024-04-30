function TableUsuario(props: any) {
    return (
        <>
            <td>{props.name}</td>
            <td>{props.birth}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.gender}</td>
            <td>{props.admin}</td>
            <td>{props.profile_pic}</td>
            <td>{props.diagnosis}</td>
            <td>{props.exercise_list}</td>
            <td>{props.signed_eula}</td>
            <td>{props.password}</td>
        </>
    )
}

export default TableUsuario

