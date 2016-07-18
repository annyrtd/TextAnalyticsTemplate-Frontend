## .kpi-tile

To create a kpi-tile with a title as heading, icon and a digit next to it you may use this code:

    <div class="box kpi-tile">
        <div class="heading">Total comments</div>
        <div class="layout horizontal">
           <div class="icon">
             <svg fill="#a4a7ac" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
               <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path>
             </svg>
           </div>
           <div class="flex digit self-center"> 12345 </div>
        </div>
    </div>

Note that you need to have a `.kpi-tile` on the container.
