function App() {
    const { Container, Row, Col } = ReactBootstrap;
    const [completedCount, setCompletedCount] = React.useState(0);
    const [incompletedCount, setIncompletedCount] = React.useState(0);

    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <TodoListCard
                        setCompletedCount={setCompletedCount}
                        setIncompletedCount={setIncompletedCount}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="text-center">
                    <div>Completed: {completedCount}</div>
                    <div>Incompleted: {incompletedCount}</div>
                </Col>
            </Row>
        </Container>
    );
}

function TodoListCard({ setCompletedCount, setIncompletedCount }) {
    const [items, setItems] = React.useState([]);
   
    React.useEffect(() => {
        fetch('/items')
            .then((r) => r.json())
            .then((data) => {
                setItems(data);
                // Calculate counts for completed and incompleted tasks
                const completedTasks = data.filter((item) => item.completed);
                const incompletedTasks = data.filter((item) => !item.completed);
                setCompletedCount(completedTasks.length);
                setIncompletedCount(incompletedTasks.length);
            });
    }, [setCompletedCount, setIncompletedCount]);
