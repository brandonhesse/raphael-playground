var width = 500, height = 500;
var paper = Raphael(0,0,width,height);

var text = paper.text(200, 20, 'Let\'s see if this works.').attr({
    'font-size': 16
});
var nowX, nowY;
text.drag(function(dx, dy, x, y, e) {
    // Adjust the current transformations by the new drag change
    var boundingBox = this.getBBox();
    //nowX = Math.min(width, Math.max(0, ));

    this.transform(this.data('current_transform')+'T'+dx+','+dy);

}, function (x, y, e) {
    // Initial save (may be blank)
    this.data('current_transform', this.transform());
    this.attr('fill', 'rgba(40, 170, 100, 0.7)');
}, function (e) {
    // Update with new values
    this.data('current_transform', this.transform());
    this.attr('fill', 'rgba(0,0,0,1.)');
    console.log(this.matrix);
    console.log(this.matrix.toTransformString());
});