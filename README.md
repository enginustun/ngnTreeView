# ngnTreeView
ngnTreeView is a basic treeview plugin, managed by jquery.

[Demo](http://tenkstudios.com/products/treeview/index.html)  

# Usage
```html
<link href="css/bootstrap.min.css" rel="stylesheet" />
<link href="css/treeview.css" rel="stylesheet" />
<script src="js/jquery-1.11.2.js"></script>
<script src="js/treeview.js"></script>
```
  
Nested
```html
  <div class="ngn-treeview tree-view">
    <ul>
        <li>
            <div>
                <a>Item 1</a>
            </div>
            <ul>
                <li>
                    <div>
                        <a>Item 1.1</a>
                    </div>
                </li>
                ...
            </ul>
        </li>
        <li class="dd-close"> <!-- dd-close for collapse  -->
            <div>
                <a>Item 2</a>
            </div>
            <ul>
                ...
                <li>
                    <div>
                        <a>Item 2.2</a>
                    </div>
                    <ul>
                        <li>
                            <div>
                                <a>Item 2.2.1</a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```
  
  JS
  ```js
  $('.ngn-treeview').ngnTreeView(); 
  ```
  
All documentation will be added soon.
