function getLTEInformation() {
    var stats_rsrq = [[0,0]],
        stats_rsrp = [[0,0]],
        i = 0,
        plot1,
        plot2,
        options_rsrq = {
            axes: {
                xaxis: {
                    numberTicks: 4,
                    tickOptions: {
                        showLabel: false
                    },
                    min : stats_rsrq[0][0],
                    max: stats_rsrq[stats_rsrq.length-1][0]
                },
                yaxis: {
                    min: -20,
                    max: -3,
                    numberTicks: 10,
                    tickOptions: {
                        formatString:'%d'
                    } 
                }
            },
            seriesDefaults: {
                rendererOptions: {
                    smooth: true
                }
            }
        },
        options_rsrp = JSON.parse(JSON.stringify( options_rsrq ));

    options_rsrp.axes.xaxis.min = stats_rsrp[0][0];
    options_rsrp.axes.xaxis.max = stats_rsrp[stats_rsrp.length-1][0];
    options_rsrp.axes.yaxis.min = -120;
    options_rsrp.axes.yaxis.max = -50;

    var interval = setInterval(function () {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://speedport.ip/data/lteinfo.json", true);
        xhr.onreadystatechange = function(data, test) {
            if (xhr.readyState !== 4) {
                return;
            }

            s = data.srcElement.responseText.replace(/[^A-Za-z0-9-':{},]+/g, '').replace(/'/g, '"');

            if (s.indexOf("DOCTYPE") > -1) {
                alert("Bitte im Speedport Hybrid einloggen!");
                $('button').click();
                clearInterval(interval);
            }

            var lteinfo = jQuery.parseJSON(s),
                rsrq = parseInt(lteinfo.rsrq, 10),
                rsrp = parseInt(lteinfo.rsrp, 10),
                cellid = lteinfo.cellid,
                phycellid = lteinfo.phycellid,
                color_rsrq,
                color_rsrp;

            $('.rsrq, .rsrp', '.lteinfo_lightbox_container').removeClass('color_1 color_2 color_3 color_4 color_5 color_6');
            $('#rsrq', '.lteinfo_lightbox_container').text(rsrq);
            $('#rsrp', '.lteinfo_lightbox_container').text(rsrp);
            $('#cellid', '.lteinfo_lightbox_container').text(cellid);
            $('#phycellid', '.lteinfo_lightbox_container').text(phycellid);

            stats_rsrq.push([i, rsrq]);
            stats_rsrp.push([i, rsrp]);
            i++;

            if (plot1) {
                plot1.destroy();

                if(stats_rsrq.length > 10) {
                    stats_rsrq.shift();
                }
            }

            if (plot2) {
                plot2.destroy();

                if(stats_rsrp.length > 10) {
                    stats_rsrp.shift();
                }
            }

            if ($('#chart1', '.lteinfo_lightbox_container').length) {
                options_rsrq.axes.xaxis.min = stats_rsrq[0][0];
                options_rsrq.axes.xaxis.max = stats_rsrq[stats_rsrq.length-1][0];
                plot1 = $.jqplot('chart1', [stats_rsrq], options_rsrq);

                options_rsrp.axes.xaxis.min = stats_rsrp[0][0];
                options_rsrp.axes.xaxis.max = stats_rsrp[stats_rsrp.length-1][0];
                plot2 = $.jqplot('chart2', [stats_rsrp], options_rsrp);
            }

            color_rsrq = getColorForRSRQ(rsrq),
            color_rsrp = getColorForRSRP(rsrp);

            $('.rsrq', '.lteinfo_lightbox_container').addClass(color_rsrq);
            $('.rsrp', '.lteinfo_lightbox_container').addClass(color_rsrp);
        }

        xhr.send();
    }, 1000);
};


