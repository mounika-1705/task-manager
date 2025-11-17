from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://frontend-site-3r3h.onrender.com", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint 
@app.get("/")
def root():
    return {"status": "ok"}

# Models
class TaskCreate(BaseModel):
    title: str

class Task(BaseModel):
    id: int
    title: str
    completed: bool = False

tasks = []
current_id = 1

# CREATE
@app.post("/tasks")
def create_task(new_task: TaskCreate):
    global current_id
    task = Task(id=current_id, title=new_task.title)
    tasks.append(task)
    current_id += 1
    return task

# GET
@app.get("/tasks")
def get_tasks():
    return tasks

# UPDATE
@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_data: TaskCreate):
    for i, task in enumerate(tasks):
        if task.id == task_id:
            tasks[i].title = updated_data.title
            return tasks[i]
    raise HTTPException(status_code=404, detail="Task not found")

# DELETE
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for i, task in enumerate(tasks):
        if task.id == task_id:
            tasks.pop(i)
            return {"message": "Task deleted"}
    raise HTTPException(status_code=404, detail="Task not found")