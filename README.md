# React-Tac-Toe

This module is a Tic-Tac-Toe game played in the browser, completed as part of a [course](http://arch-joelross.rhcloud.com/) at the UW ISchool. 

The below questions should be answered (in detail!) regarding your submission!


##### 1. Does using a Model-View-Controller architecture make it easier to change your game in the future? How many places would you need to make changes to your code to make this a 5x5 game of Tic-Tac-Toe?
> The beginning of building MVC is kind of pain. Because even though I don't do it in MVC way, I can still make a functional page. Such freedom made me confused. Without using MVC, my code was kind of grossa and messy. Then I realized how brilliant MVC is. By separating view, model and controller. It's very easy to undestand what's going on and very easy for future changing. Right now I think it is brilliant. If I want to make my game a 5*5, the only thing to change is to change the size parament when making a new model. One line of code. Done. My game has the function to change the size because it is very convinient to do that.  


##### 2. Why did I say that an `Array` is the best data structure to represent the game's grid of cells? Why not a 2D-array (Array of Arrays), or an Object, or a Linked-List, or a Tree? 
> In this problem An 1-d array is totally capable of solving the tracking issue. What we need is a data structure to keep track of each box's status and thus decide whether the game has a winner or not. In a 1-D array, the index is the box numbe and the element is the symbol value. Totally fine. A 2-D array will need two indexs to locate a element. The first is the row number then is the column number. It is over complicatd and does not gain any efficiency. I think the only good point of 2-d array is that it's easier to be understood. Because it is similar to math coordinate plane.  Linked-list and tree are not so good here because they do not have indexes. We cannot check and edit the element record convienently. 

##### 3. What online resources did you find to help you learn React? How do you search for resources, and how did you determine whether they were helpful or not? Think back to the "learning an API" paper! 
> http://reactjsnews.com/isomorphic-javascript-with-react-node/
> https://facebook.github.io/react/docs/glossary.html
> http://buildwithreact.com/tutorial


##### 4. Approximately how many hours did it take you to complete this assignment? #####
> 40 hours.


##### 5. Did you receive help from any other sources (classmates, etc)? If so, please list who (be specific!). #####
> Joel


##### 6. Did you encounter any problems in this assignment we should warn students about in the future? How can we make the assignment better? #####
> How to use Reatjs is not very clear. How to separate MVC really needs deeper explanation. Joel did that in a lab, which is very helpful. But the lab was actually on the due date. 
