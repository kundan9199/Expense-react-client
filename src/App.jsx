import Student from "./pages/examples/Student";
import Student1 from "./pages/examples/Student1";
import Student2 from "./pages/examples/Student2";

function App() {
    return (
        <>
            <h1>Welcome to Expense App</h1>
            <Student />
            
            <Student1 />
            
            <Student1 name="John" rollNumber={20} />

            <Student2 name="Sam" rollNumber={40} />
        </>
    );
}

export default App;
