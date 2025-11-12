
export default function Row({ item, deleteTask, isLoggedIn }) { 
return (
<li>
{item.description}
      {isLoggedIn && ( 
<button
 className="delete-button"
 onClick={() => deleteTask(item.id)}
>
Delete
</button>
      )}
 </li>
);
}